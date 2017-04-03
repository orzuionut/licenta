class ConversationCreate
{
    constructor()
    {
        this.$addButton = $("#add-conversation");
        this.$selectField = $('select');
        
        // Activate modal triggering
        this.modal = $('.modal');
        this.modal.modal();

        this.friends = [];

        this.bindDOMListeners();
    }

    bindDOMListeners()
    {
        let self = this;
        
        this.$addButton.on('click', self.handleAdd.bind(self));
    }

    handleAdd()
    {
        let self = this;

        if (self.friends.length == 0)
        {
            $.ajax({
                type: "GET",
                url: "conversation/get/friends",
                data: {},
                success: function (data)
                {
                    self.friends = data;

                    self.createSelectField(data);
                }
            });
        }
    }

    createSelectField(data)
    {
        this.$selectField.append(this.createOptions(data));

        this.$selectField.material_select();
    }

    createOptions(data)
    {
        let options = "";

        for(var i = 0; i < data.length; i++)
        {
            options += `<option value="${data[i].id}"> ${data[i].first_name} ${data[i].last_name} </option>`;
        }

        return options;
    }
}

export {ConversationCreate}