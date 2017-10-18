FROM ruby:2.4
MAINTAINER Michel Boaventura <michel.boaventura@gmail.com>

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y build-essential jq libjson-c-dev libboost-dev libboost-program-options-dev gawk nodejs yarn
RUN npm install -g ember-cli
RUN npm install -g bower

ENV LANG C.UTF-8
ENV RAILS_ENV docker
ENV EMBER_ENV docker

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN bundle install --without development:test

WORKDIR /usr/src/app/frontend
RUN npm install

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN bundle exec rake assets:precompile

WORKDIR /usr/src/app
