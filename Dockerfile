# Use a imagem oficial do Node.js como a base
FROM node:14

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o resto dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação estará em execução (por padrão, o NestJS usa a porta 3000)
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "start"]
