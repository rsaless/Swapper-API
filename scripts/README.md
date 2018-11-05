# SCRIPTS
esta é uma pasta contendo scripts para automatização de algumas das tarefas da parte de operações

## Lista de scripts: 

### 1 - alurapic.bat
script para executar o servidor para o front-end Angular

> cd ..  
> cd alurapic  
> ng serve --open  

### 2 - api.bat
script para executar o servidor para o back-end Node

> cd ..  
> cd api  
> npm start  

### 3 - setup.bat
script para preparar os projetos Angular e Node, instalar dependências e configurar demais ambientes  

> cd ..  
> cd alurapic  
> npm install  
> cd ..  
> cd api  
> npm install sqlite3  
> npm install  

### 4 - github.bat
script para preparar o próximo commit e enviar para o github

> cd ..  
> git add .  
> git commit -m %1  
> git push  

### 5 - github_setup.bat
script para preparar o repositório e fazer o commit inicial

> cd ..  
> git init  
> git add .  
> git commit -m "preparando o projeto"  
> git remote add origin https://github.com/%1/%2.git  
> git push -u origin master  

### 6 - init.bat
script para abrir o prompt para execução de outros scripts

> cmd /k  

## Utilização:

### Inicializando um repositório

* Executar o script init.bat
* Com o prompt aberto executar o comando:  
      
> github_setup "Usuário-github" "Nome-do-repositório"  

* OBS: o repositório deve existir no github

### Automatizando os commits

* Executar o script init.bat
* Com o prompt aberto executar o comando:  
      
> github "Mensagem-de-commit"  


