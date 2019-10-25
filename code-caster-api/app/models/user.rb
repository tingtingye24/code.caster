class User < ApplicationRecord


    def self.topTen
        users = User.all
        sort_user = users.sort_by{|user| user.score ? user.score : 0 }.reverse
        return sort_user.first(10)
    end
end
