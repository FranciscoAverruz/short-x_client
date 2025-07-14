import { useEffect, useState } from "react";

const useRateLimiter = (
  key = "resetPassword",
  maxAttempts = 3,
  cooldown = 300
) => {
  const [tooManyAttempts, setTooManyAttempts] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`rateLimit_${key}`));

    if (storedData) {
      const { attempts, firstAttemptTime } = storedData;
      const now = Date.now();

      if (attempts >= maxAttempts) {
        const elapsed = Math.floor((now - firstAttemptTime) / 1000);

        if (elapsed < cooldown) {
          setTooManyAttempts(true);
          setCooldownTime(cooldown - elapsed);
        } else {
          localStorage.removeItem(`rateLimit_${key}`);
        }
      }
    }
  }, [key, maxAttempts, cooldown]);

  useEffect(() => {
    let interval;

    if (tooManyAttempts && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setTooManyAttempts(false);
            localStorage.removeItem(`rateLimit_${key}`);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [tooManyAttempts, cooldownTime, key]);

  const registerAttempt = () => {
    const now = Date.now();
    const storedData = JSON.parse(localStorage.getItem(`rateLimit_${key}`));

    if (storedData) {
      const { attempts, firstAttemptTime } = storedData;

      const newAttempts = attempts + 1;

      localStorage.setItem(
        `rateLimit_${key}`,
        JSON.stringify({
          attempts: newAttempts,
          firstAttemptTime,
        })
      );

      if (newAttempts >= maxAttempts) {
        setTooManyAttempts(true);
        setCooldownTime(cooldown);
      }
    } else {
      localStorage.setItem(
        `rateLimit_${key}`,
        JSON.stringify({
          attempts: 1,
          firstAttemptTime: now,
        })
      );
    }
  };

  const formatCooldownTime = () => {
    const hours = Math.floor(cooldownTime / 3600);
    const minutes = Math.floor(cooldownTime / 60);
    const seconds = cooldownTime % 60;

    const timeOnScreen = [];

    if (hours > 0) timeOnScreen.push(`${hours}h`);
    if (minutes > 0) timeOnScreen.push(`${minutes}m`);
    if (seconds > 0 || timeOnScreen.length === 0) timeOnScreen.push(`${seconds}s`);

    return timeOnScreen.join(" ");
  };

  const formattedCooldown = formatCooldownTime(cooldownTime);

  return {
    tooManyAttempts,
    cooldownTime,
    formattedCooldown,
    registerAttempt,
  };
};

export default useRateLimiter;
