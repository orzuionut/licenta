'use strict'

const Validator = use('Validator');
const User = use('App/Model/User');

class RegisterController
{
    * index(request, response)
    {
        yield response.sendView('pages/auth/register/index')
    }

    * store(request, response)
    {
        const user = request.only('first_name', 'last_name', 'email', 'password');

        const validation = yield Validator.validate(user, User.rules);

        if (validation.fails())
        {
            yield request
                .withAll()
                .andWith({errors: validation.messages()})
                .flash();

            response.redirect('back');
        }

        yield User.create(user);

        response.redirect('/login');
    }
}

module.exports = RegisterController;
