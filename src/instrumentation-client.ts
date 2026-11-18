import { initBotId } from "botid/client/core";

// BotID – niewidoczna weryfikacja, że formularz wysyła człowiek.
// Akcja serwerowa formularza to zapytanie POST na stronę główną.
initBotId({
  protect: [{ path: "/", method: "POST" }],
});
