import { Setter } from "solid-js";
// import languages from "../../languages";

export function handleTyping(
    e: KeyboardEvent & { currentTarget: HTMLTextAreaElement },
    setText: Setter<string>,
    setWorking: Setter<string>,
    language: { [key: string]: string }
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
        let intended = language[working + e.key];

        if (intended) {
            console.log("there is a letter inteneded here");
            setText(
                (text) =>
                    text.substring(0, text.length - working.length) + intended
            );
        } else {
            console.log("there is no letter here");
            intended = language[e.key] || "";

            setText((text) => text + intended);
            return "";
        }

        console.log("current working: ", working + e.key);
        return working + e.key;
    });
}
