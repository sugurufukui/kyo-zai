FROM ruby:3.0.2
RUN apt-get update -qq && \
    apt-get install -y build-essential \
                       libpq-dev \
                       nodejs

RUN mkdir /kyo-zai
WORKDIR /kyo-zai
COPY Gemfile /kyo-zai/Gemfile
COPY Gemfile.lock /kyo-zai/Gemfile.lock
RUN gem install bundler
RUN bundle install --without test development
ADD . /kyo-zai
EXPOSE 3000

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["/bin/sh", "-c", "bundle exec unicorn -p 3000 -c /kyo-zai/config/unicorn.rb -E production"]
