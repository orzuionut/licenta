class Footer{

    constructor($message_input, $submit_button)
    {
        this.$message_input = $message_input;
        this.$submit_button = $submit_button;
    }

    clearInput()
    {
        this.$message_input.val("");
    }

    clickSubmitButton()
    {
        this.$submit_button.click();
    }

    getMessage()
    {
        return this.$message_input.val();
    }
}

export { Footer }