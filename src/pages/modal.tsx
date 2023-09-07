import { createResource, createSignal, For, Show, Suspense } from "solid-js";
import { render } from "solid-js/web";
import { api } from "../lib/api";
// import languages from "../../languages";
import "../styles/main.scss";
import { handleTyping } from "../lib/handleTyping";
import { Language } from "../languages";

function MainPage() {
    const [working, setWorking] = createSignal("");
    const [text, setText] = createSignal("");

    const [languages] = createResource(async () => {
        return api<Language[]>("getLanguages", null);
    });

    const [language, setLanguage] = createSignal<{ [key: string]: string }>();

    const handleSelect = async (id: string) => {
        const resp = await api<{ language: { [key: string]: string } }>(
            "getLanguageById",
            {
                id,
            }
        );
        setLanguage(resp.language);
    };

    return (
        <div class="container">
            <div class="controls">
                <Suspense fallback={<p>loading languages...</p>}>
                    <select
                        onChange={(e) => handleSelect(e.currentTarget.value)}
                    >
                        <option>Select language</option>

                        <For each={languages()}>
                            {(language) => {
                                return (
                                    <option value={language.id}>
                                        {language.name}
                                    </option>
                                );
                            }}
                        </For>
                    </select>
                </Suspense>
            </div>

            <Show when={!languages.loading && language()}>
                <textarea
                    value={text()}
                    onKeyDown={(e) =>
                        language()
                            ? handleTyping(e, setText, setWorking, language()!)
                            : null
                    }
                    style={{ width: "100%", height: "100%" }}
                />

                <div style={{ display: "flex", "justify-content": "center" }}>
                    <button
                        onClick={async () => {
                            const resp = await api("insertText", text());
                            console.log(resp);
                        }}
                    >
                        Insert Text
                    </button>
                </div>
            </Show>
        </div>
    );
}

render(() => <MainPage />, document.getElementById("app")!);
