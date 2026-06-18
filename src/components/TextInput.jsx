function TextInput({ text, setText, inputError, setInputError }) {
    return (
        <>
            <textarea
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    if (inputError) setInputError("");
                }}
                placeholder="Paste your study material here..."
            />
            {inputError && (
                <div className="input-error">
                    ⚠️ {inputError}
                </div>
            )}
        </>
    );
}

export default TextInput;