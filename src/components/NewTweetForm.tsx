import Button from "./Button"
import { useSession } from "next-auth/react";
import ProfileImage from "./ProfileImage";
import { useState, useCallback, useRef, useLayoutEffect } from "react";
import { api } from "~/utils/api";

function updateTextAreaHeight(textarea: HTMLTextAreaElement) {
    if(textarea == null) return;
    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

export default function NewTweetForm() {
    const session = useSession();

    if(session.status !== "authenticated") return null;

    return ( <Form /> )
}

function Form() {
    const session = useSession();
    const [inputValue, setInputValue] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textarea: HTMLTextAreaElement) => {
        textareaRef.current = textarea;
        updateTextAreaHeight(textarea);
    }, []);

    useLayoutEffect(() => {
        if(textareaRef.current == null) return;
        updateTextAreaHeight(textareaRef.current);
    }, [inputValue]);

    const createTweet = api.tweet.create.useMutation( {
        onSuccess: (newTweet) => {
            setInputValue("");
            textareaRef.current?.focus();
            console.log(newTweet);
        }
    });

    if(session.status !== "authenticated") return null;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        createTweet.mutate({ content: inputValue });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />
                <textarea 
                    ref={inputRef}
                    style={{height: 0}}
                    className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="what's happening"
                >

                </textarea>
            </div>
            <Button className='self-end'>Tweet</Button>
        </form>
    )
}