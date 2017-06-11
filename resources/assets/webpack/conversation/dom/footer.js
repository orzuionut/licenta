class Footer
{
    constructor()
    {
        this.$message_input = $('#enter-message');
        this.$submit_button = $('#submit-message');

        this.style();
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

    style()
    {
        let height = this.$submit_button.css( "height" );
        this.$submit_button.css({"width": height + "px"});
    }
}

export { Footer }