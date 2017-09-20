FROM ruby:2.4
MAINTAINER Michel Boaventura <michel.boaventura@gmail.com>

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y build-essential jq libjson-c-dev libboost-dev libboost-program-options-dev gawk nodejs

ENV LANG C.UTF-8
ENV RAILS_ENV docker

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN bundle install --without development:test

WORKDIR /usr/src/app/frontend
RUN npm install
