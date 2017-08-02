FROM ruby:2.4
MAINTAINER Michel Boaventura <michel.boaventura@gmail.com>

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

RUN apt-get update -qq && apt-get install -y build-essential jq libjson-c-dev libboost-dev libboost-program-options-dev gawk

ENV LANG C.UTF-8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV RAILS_ENV=docker

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/
RUN bundle install --without development:test
COPY . /usr/src/app/
