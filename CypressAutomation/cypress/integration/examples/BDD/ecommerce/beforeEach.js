beforeEach(()=>
{
    cy.fixture('example.json').then(function(data)
    {
        this.data = data
    }
    )
}
)