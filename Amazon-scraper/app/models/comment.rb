class Comment < ActiveRecord::Base
  belongs_to :article
  validates_presence_of :commenter, :message => "Please include your name"
  validates_presence_of :body, :message => "Message can't be blank"

end
