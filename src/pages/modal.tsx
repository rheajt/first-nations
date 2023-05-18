import { createSignal, For, Setter } from "solid-js";
import { render } from "solid-js/web";
import { api } from "../lib/api";
import languages from "../../languages";
import "../styles/main.scss";

function handleTyping(
    e: KeyboardEvent & { currentTarget: HTMLTextAreaElement },
    setText: Setter<string>,
    setWorking: Setter<string>,
    selected: string
) {
    e.preventDefault();

    // if (keys.includes(e.key)) {
    //     working += e.key;
    //     languageText.value = complete + working;
    // }

    if (e.key === "Tab") {
        console.log("tab");
        // clears();
        // const match = entries.shift();
        // console.log(complete, match[1]);

        // complete += match[1];
        // working = "";
        // languageText.value = complete;
        // languageText.textContent += match[1];
    }

    if (e.key === "Delete") {
        console.log("delete!!!");
    }

    if (e.key === "Backspace") {
        console.log("backspace");
        setText((text) => text.slice(0, -1));
        return;
        // if (working.length > 0) {
        //     working = working.slice(0, -1);
        //     languageText.value = complete + working;
        // } else {
        //     complete = complete.slice(0, -1);
        //     languageText.value = complete;
        // }
    }

    if (e.key === " ") {
        console.log("space bar");
        setText((text) => text + " ");
        return;
        // working = "";
        // complete += " ";
        // languageText.value = complete;
    }

    setWorking((working) => {
        let intended = (languages as any)[selected].language[working + e.key];

        if (intended) {
            console.log("there is a letter inteneded here");
            setText(
                (text) =>
                    text.substring(0, text.length - working.length) + intended
            );
        } else {
            console.log("there is no letter here");
            intended = (languages as any)[selected].language[e.key] || "";

            setText((text) => text + intended);
            return "";
        }

        console.log("current working: ", working + e.key);
        return working + e.key;
    });
}

function MainPage() {
    const [selected, setSelected] = createSignal("ojibwe");
    const [working, setWorking] = createSignal("");
    const [text, setText] = createSignal("");

    return (
        <div class="container">
            <div class="controls">
                <select
                    value={selected()}
                    onChange={(e) => setSelected(e.currentTarget.value)}
                >
                    <For each={Object.entries(languages)}>
                        {([key, language]) => {
                            return <option value={key}>{language.name}</option>;
                        }}
                    </For>
                </select>
            </div>

            <textarea
                value={text()}
                onKeyDown={(e) =>
                    handleTyping(e, setText, setWorking, selected())
                }
                style={{ width: "100%" }}
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
        </div>
    );
}

render(() => <MainPage />, document.getElementById("app")!);
