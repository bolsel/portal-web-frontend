FROM --platform=linux/amd64 <%= IMAGE_BASE %>
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node:node . .
USER node
EXPOSE 80
ENV PORT 80
CMD ["npm", "start"]
