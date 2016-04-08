class WelcomeController < ApplicationController

  def index
    @all = Conversion.all
    
    @all.map {|c| c.amount = co2}
    
    @co2 = Conversion.find(25)
    @co2.amount = co2
    
    @random = @all.sample
    if @random.amount < 1 then
      @random = @all.sample
    end
  end

  def about
  end

  def api
  end
  
  private
  
  def co2
    if !params[:co2].nil?
      co2 = params[:co2].to_i
      if co2 < 1 then co2 = 1 end
    else
      co2 = 1
    end
    return co2
  end

end
