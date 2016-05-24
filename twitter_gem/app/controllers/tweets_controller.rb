class TweetsController < ApplicationController

  def index
    client = Tweet.sync
    # @trump_tweets = client.search("to:realDonaldTrump", result_type: "recent").take(5)

    @puppy = client.oembed("#{client.search("puppy filter:twimg", lang: "en", result_type: "popular").take(1).first.id}")
  end

end
