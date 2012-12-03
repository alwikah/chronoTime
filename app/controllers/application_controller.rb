class ApplicationController < ActionController::Base
  protect_from_forgery

  helper_method :onload_function

  # Can be overloaded
  def onload_function
    ''
  end

end
