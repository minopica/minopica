class LoginPage
{
    
    //button ENTRA nella pagina login
    getEntraButton()
    {
        return cy.get('#login_entra')
    }

    getUsernameTextField()
    {
        return cy.get('#firstInput')
    }

    getContinuaButton()
    {
        return cy.get('#login_continua')
    }

    getPasswordTextField()
    {
        return cy.get("input[formcontrolname='password']")
    }

    getAccediButton()
    {
        return cy.get('#accedi')
    }
}

export default LoginPage