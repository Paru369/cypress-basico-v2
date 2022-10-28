

/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
 

  beforeEach( () => {

    cy.visit('./src/index.html');

  });

 
  it('verifica o título da aplicação', function() {

    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
 });

 Cypress._.times(5, ()=>{
  it('preenche os campos obrigatórios e envia formulário', () => {
    cy.get('input[name="firstName"]').type("Jose Henrique");
    cy.get('input[name="lastName"]').type("da Silva");
    cy.get('input[id="email"]').type("jhds@testmail.com");
    cy.get('textarea[id="open-text-area"]').type("Estou aprendendo sobre testes, pode me ajudar?", { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.clock() 
    cy.get('.success').should('be.visible');
    cy.tick(3000)
    cy.get('.success').should('not.be.visible');


  });
});

it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preenche a area de texto usando o comando invoke', () => {
  const longText = Cypress._.repeat('0123456789', 20)
  
  cy.get('#open-text-area').invoke('val', longText).should('have.value', longText)
})

it('faz uma requisição HTTP', () => {
  const longText = Cypress._.repeat('0123456789', 20)
  
  cy.request({
    method: 'GET',
    url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
  }).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.statusText).to.equal('OK')
    expect(response.body).contains('CAC TAT') //to.include
  })
})



  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock() 
    cy.get('input[name="firstName"]').type("Jose Henrique");
    cy.get('input[name="lastName"]').type("da Silva");
    cy.get('input[id="email"]').type(`emailerrado @ . com`);
    cy.get('textarea[id="open-text-area"]').type("Estou aprendendo sobre testes, pode me ajudar?", { delay: 0 });
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
    cy.tick(3000)
    cy.get('.error').should('not.be.visible');

  });

  it('verifica se numero de telefone tem apenas numeros', () => {
   
    cy.get('input[id="phone"]')
      .should('not.have.text')
      .type("abcde")
      .should('have.value', '');
  

  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[name="firstName"]').type("Jose Henrique");
    cy.get('input[name="lastName"]').type("da Silva");
    cy.get('input[id="email"]').type(`emailerrado@testmail.com`);
    cy.get('input[id="phone"]').should('not.have.text');
    cy.get('textarea[id="open-text-area"]').type("Estou aprendendo sobre testes, pode me ajudar?");
    cy.get('#phone-checkbox').check();
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');

  });

  
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[name="firstName"]').type("Jose Henrique").should('have.value', "Jose Henrique").clear().should('have.value', '');
    cy.get('input[name="lastName"]').type("da Silva").should('have.value', "da Silva").clear().should('have.value', '');
    cy.get('input[id="email"]').type(`jhds@testmailcom`).should('have.value', "jhds@testmailcom").clear().should('have.value', '');
    cy.get('input[id="phone"]').type(`77889977`).should('have.value', "77889977").clear().should('have.value', '');
    

  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');

  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    
    cy.fillMandatoryFieldsAndSubmit();


  });


  it('CY.CONTAINS = preenche os campos obrigatórios e envia formulário', () => {
    cy.clock() 
    cy.contains("Nome").click().type("Jose Henrique");
    cy.contains("Sobrenome").click().type("da Silva");
    cy.contains("E-mail").click().type("jhds@testmail.com");
    cy.get('textarea[id="open-text-area"]').type("Testando o Cy Contains...");
    cy.contains('button',"Enviar").click();
    cy.get('.success').should('be.visible');
    cy.tick(3000)
    cy.get('.success').should('not.be.visible');

  });

  it('seleciona um produto(YouTube) por seu texto', () => {

    cy.get('#product').select('YouTube').should('have.value', 'youtube')


  })

  it('seleciona um produto(Mentoria) por seu valor', () => {

    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')


  })

  it('seleciona um produto(Blog) por seu indice', () => {

    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')


  })

  it(`marca o tipo de atendimento "Feedback"`, ()=> {

    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')

  })

  it(`marca cada tipo de atendimento`, ()=> {

    cy.get('input[type="radio"]')
    .should('have.length',3).each(($radio)=>{
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it(`marca ambos checkboxes, depois desmarca o último`, ()=> {

    cy.get('input[type="checkbox"]')
    .should('have.length',2).each(($checkbox)=>{
      cy.wrap($checkbox).check()
      cy.wrap($checkbox).should('be.checked')
    })
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it(`seleciona um arquivo da pasta fixtures`, ()=> {

    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .then(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })

  })

  it(`seleciona um arquivo com drag and drop`, ()=> {

    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
    .then(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })

  })

  it(`seleciona um arquivo utilizando uma fixture para a qual foi dada um alias`, ()=> {

    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('@sampleFile')
    .then(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })

  })

  it(`verifica que a política de privacidade abre em outra aba sem a necessidade de um clique`, ()=> {

    
    cy.get('a').should('have.attr', 'target', '_blank')

  })

  it(`acessa a página da política de privacidade removendo o target e então clicanco no link`, ()=> {

    
    cy.get('a').should('have.attr', 'target', '_blank')
    .invoke('removeAttr', 'target')
    .click()

    cy.get('#title')
    .should('have.text', 'CAC TAT - Política de privacidade')
    
    cy.contains('Talking').should('be.visible')

  })

  it(`testa a página da política de privacidade de forma independente`, ()=> {

    
    cy.get('a').should('have.attr', 'target', '_blank')
    .invoke('removeAttr', 'target')
    .click()

    

  })
  

  it.only(`encontra o gato`, ()=> {

    
    cy.contains('🐈')
    .invoke('show')
    .should('be.visible')

    

  })



})