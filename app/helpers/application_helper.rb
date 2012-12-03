module ApplicationHelper

  # Helper methods for displaying time

  # Returns a string in this format : hh:mm:ss
  def nb_seconds_to_string(nbSec)


    result1 = result(nbSec);

    secondes = result1[0];
    min = result1[1];

    result2 = self.result(min);

    minutes = result2[0];
    hours = result2[1];

    timeUnitsToString(secondes, minutes, hours);
  end

  # Tools

  def result(t)
    if t>59
      [t%60, (t - t%60)/60]
    else
      [t, 0]
    end
  end

  def timeUnitsToString(s,m,h)

  end


end
