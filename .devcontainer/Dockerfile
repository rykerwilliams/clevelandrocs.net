FROM mcr.microsoft.com/devcontainers/jekyll

USER root

RUN rm -f /etc/apt/sources.list.d/yarn.list \
    && rm -f /usr/share/keyrings/yarnkey.gpg /etc/apt/trusted.gpg.d/yarn.gpg \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        imagemagick \
        inotify-tools \
        jupyter-nbconvert \
        procps \
        ruby-full \
        zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

USER vscode