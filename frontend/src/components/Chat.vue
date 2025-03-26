<script setup>
import { ref, onMounted, onUpdated, computed, watch } from "vue";
import { parseJwt } from "../lib/jwtparser.js";
import socket from "../utils/socket/socket.js";

const emit = defineEmits(["close-chat"]);

const closeChat = () => {
  emit("close-chat");
};

const messages = ref([]);
const newMessage = ref("");
const errorMessage = ref("");
const chatMessagesRef = ref(null);

const userName = ref(parseJwt(localStorage.getItem("access_token")).username);
const userId = ref(parseJwt(localStorage.getItem("access_token")).sub);
const isAdmin = ref(parseJwt(localStorage.getItem("access_token")).userGroup === "admin");

const isBanned = ref(false);
const timeoutExpires = ref(null);
const timeoutRemaining = ref(0);
let timeoutInterval = null;

const forbiddenWords = [
  "h1tl3r",
  "h1tler",
  "hitl3r",
  "fasz",
  "mocskos",
  "kutya",
  "cici",
  "hitler",
  "csöcs",
  "csocs",
  "kuvasz",
  "budos dog",
  "patkany",
  "patkány",
  "puna",
  "sunci",
  "n1gger",
  "nigg3r",
  "n1ga",
  "n1g4",
  "nig4",
  "megfoglak baszni",
  "büdös dög",
  "szétbaszom a fejed",
  "baszni",
  "geci",
  "nigger",
  "niga",
  "cigány",
  "cigánynigger",
  "cigány nigger",
  "nigabiga",
  "cigany",
  "kurva",
  "gecis kurva",
  "cigány kurva",
  "aberált",
  "aberrált",
  "abortuszmaradék",
  "abszolút hülye",
  "agyalágyult",
  "agyatlan",
  "agybatetovált",
  "ágybavizelős",
  "agyfasz",
  "agyhalott",
  "agyonkúrt",
  "agyonvert",
  "agyrákos",
  "aids-es",
  "alapvetően fasz",
  "animalsex-mániás",
  "antibarom",
  "aprófaszú",
  "arcbarakott",
  "aszaltfaszú",
  "aszott",
  "átbaszott",
  "azt a kurva de fasz",
  "balfasz",
  "balfészek",
  "baromfifasz",
  "basz-o-matic",
  "baszhatatlan",
  "basznivaló",
  "bazmeg",
  "bazdmeg",
  "bazd meg",
  "bazzeg",
  "bebaszott",
  "befosi",
  "békapicsa",
  "bélböfi",
  "beleiből kiforgatott",
  "bélszél",
  "brunya",
  "büdösszájú",
  "búvalbaszott",
  "buzeráns",
  "buzernyák",
  "buzi",
  "buzikurva",
  "cafat",
  "cafka",
  "céda",
  "cérnafaszú",
  "cigány",
  "cottonfej",
  "cseszett",
  "csibefasz",
  "csipszar",
  "csirkefaszú",
  "csitri",
  "csöcs",
  "csöcsfej",
  "csöppszar",
  "csupaszfarkú",
  "cuncipunci",
  "deformáltfaszú",
  "dekorált pofájú",
  "döbbenetesen segg",
  "dobseggű",
  "dughatatlan",
  "dunyhavalagú",
  "duplafaszú",
  "ebfasz",
  "egyszerűen fasz",
  "elbaszott",
  "eleve hülye",
  "extrahülye",
  "fantasztikusan segg",
  "fasszopó",
  "fasz",
  "fasz-emulátor",
  "faszagyú",
  "faszarc",
  "faszfej",
  "faszfészek",
  "faszkalap",
  "faszkarika",
  "faszkedvelő",
  "faszkópé",
  "faszogány",
  "faszpörgettyű",
  "faszsapka",
  "faszszagú",
  "faszszopó",
  "fasztalan",
  "fasztarisznya",
  "fasztengely",
  "fasztolvaj",
  "faszváladék",
  "faszverő",
  "feka",
  "félrebaszott",
  "félrefingott",
  "félreszart",
  "félribanc",
  "fing",
  "fölcsinált",
  "fölfingott",
  "fos",
  "foskemence",
  "fospisztoly",
  "fospumpa",
  "fostalicska",
  "fütyi",
  "fütyinyalogató",
  "fütykös",
  "geci",
  "gecinyelő",
  "geciszaró",
  "geciszívó",
  "genny",
  "gennyesszájú",
  "gennygóc",
  "genyac",
  "genyó",
  "gólyafos",
  "görbefaszú",
  "gyennyszopó",
  "gyíkfing",
  "hájpacni",
  "hatalmas nagy fasz",
  "hátbabaszott",
  "házikurva",
  "hererákos",
  "hígagyú",
  "hihetetlenül fasz",
  "hikomat",
  "hímnőstény",
  "hímringyó",
  "hiperstrici",
  "hitler-imádó",
  "hitlerista",
  "hivatásos balfasz",
  "hú de segg",
  "hugyagyú",
  "hugyos",
  "hugytócsa",
  "hüje",
  "hüle",
  "hülye",
  "hülyécske",
  "hülyegyerek",
  "inkubátor-szökevény",
  "integrált barom",
  "ionizált faszú",
  "iq bajnok",
  "iq fighter",
  "iq hiányos",
  "irdatlanul köcsög",
  "íveltfaszú",
  "jajj de barom",
  "jókora fasz",
  "kaka",
  "kakamatyi",
  "kaki",
  "kaksi",
  "kecskebaszó",
  "kellően fasz",
  "képlékeny faszú",
  "keresve sem található fasz",
  "kétfaszú",
  "kétszer agyonbaszott",
  "ki-bebaszott",
  "kibaszott",
  "kifingott",
  "kiherélt",
  "kikakkantott",
  "kikészült",
  "kimagaslóan fasz",
  "kimondhatatlan pöcs",
  "kis szaros",
  "kisfütyi",
  "klotyószagú",
  "kojak-faszú",
  "kopárfaszú",
  "korlátolt gecizésű",
  "kotonszökevény",
  "középszar",
  "kretén",
  "kuki",
  "kula",
  "kunkorított faszú",
  "kurva",
  "kurvaanyjú",
  "kurvapecér",
  "kutyakaki",
  "kutyapina",
  "kutyaszar",
  "lankadtfaszú",
  "lebaszirgált",
  "lebaszott",
  "lecsesszett",
  "leírhatatlanul segg",
  "lemenstruált",
  "leokádott",
  "lepkefing",
  "leprafészek",
  "leszart",
  "leszbikus",
  "lőcs",
  "lőcsgéza",
  "lófasz",
  "lógócsöcsű",
  "lóhugy",
  "lotyó",
  "lucskos",
  "lugnya",
  "lyukasbelű",
  "lyukasfaszú",
  "lyukát vakaró",
  "lyuktalanított",
  "mamutsegg",
  "maszturbációs görcs",
  "maszturbagép",
  "maszturbáltatott",
  "megfingatott",
  "megkettyintett",
  "megkúrt",
  "megszopatott",
  "mesterséges faszú",
  "méteres kékeres",
  "mikrotökű",
  "mojfing",
  "műfaszú",
  "muff",
  "multifasz",
  "műtöttpofájú",
  "náci",
  "[ redacted ]",
  "nikotinpatkány",
  "nimfomániás",
  "nuna",
  "nunci",
  "nuncóka",
  "nyalábfasz",
  "nyasgem",
  "nyelestojás",
  "nyúlszar",
  "oltári nagy fasz",
  "ondónyelő",
  "orbitálisan hülye",
  "ordenálé",
  "összebaszott",
  "ötcsillagos fasz",
  "óvszerezett",
  "pénisz",
  "peremesfaszú",
  "picsa",
  "picsafej",
  "picsameresztő",
  "picsánnyalt",
  "picsánrugott",
  "picsányi",
  "pina",
  "pinna",
  "pisa",
  "pisaszagú",
  "pisis",
  "pöcs",
  "pöcsfej",
  "porbafingó",
  "pornóbuzi",
  "pornómániás",
  "pudvás",
  "pudváslikú",
  "puhafaszú",
  "punci",
  "puncimókus",
  "puncis",
  "punciutáló",
  "puncivirág",
  "qki",
  "qrva",
  "qtyaszar",
  "rágcsáltfaszú",
  "redva",
  "rendkívül fasz",
  "rétó-román",
  "ribanc",
  "riherongy",
  "rivalizáló",
  "rőfös fasz",
  "rojtospicsájú",
  "rongyospinájú",
  "roppant hülye",
  "rossz kurva",
  "saját nemével kefélő",
  "segg",
  "seggarc",
  "seggdugó",
  "seggfej",
  "seggnyaló",
  "seggszőr",
  "seggtorlasz",
  "strici",
  "suttyó",
  "sutyerák",
  "szálkafaszú",
  "szar",
  "szaralak",
  "szárazfing",
  "szarbojler",
  "szarcsimbók",
  "szarevő",
  "szarfaszú",
  "szarházi",
  "szarnivaló",
  "szarosvalagú",
  "szarrá vágott",
  "szarrágó",
  "szarszagú",
  "szarszájú",
  "szartragacs",
  "szarzsák",
  "szégyencsicska",
  "szifiliszes",
  "szivattyús kurva",
  "szófosó",
  "szokatlanul fasz",
  "szop-o-matic",
  "szopógép",
  "szopógörcs",
  "szopós kurva",
  "szopottfarkú",
  "szűklyukú",
  "szúnyogfaszni",
  "szuperbuzi",
  "szuperkurva",
  "szűzhártya-repedéses",
  "szűzkurva",
  "szűzpicsa",
  "szűzpunci",
  "tikfos",
  "tikszar",
  "tompatökű",
  "törpefaszú",
  "toszatlan",
  "toszott",
  "totálisan hülye",
  "tyű de picsa",
  "tyúkfasznyi",
  "tyúkszar",
  "vadfasz",
  "valag",
  "valagváladék",
  "végbélféreg",
  "xar",
  "zsugorított faszú",
];

const updateTimeoutRemaining = () => {
  if (!timeoutExpires.value) return;
  const now = new Date();
  const diff = new Date(timeoutExpires.value) - now;
  
  if (diff <= 0) {
    timeoutExpires.value = null;
    timeoutRemaining.value = 0;
    localStorage.removeItem(`user_${userId.value}_timeout`);
    clearInterval(timeoutInterval);
    return;
  }

  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor((diff / 1000) % 60);
  timeoutRemaining.value = `${minutes}p ${seconds}mp`;
};

const isTimedOut = computed(() => {
  return timeoutExpires.value && new Date() < new Date(timeoutExpires.value);
});

watch(isTimedOut, (newVal) => {
  if (newVal) {
    timeoutInterval = setInterval(updateTimeoutRemaining, 1000);
  } else {
    clearInterval(timeoutInterval);
  }
});

const sendMessage = () => {
  if (isBanned.value) {
    errorMessage.value = "Ki vagy tiltva! Nem küldhetsz üzeneteket.";
    return;
  }
  
  if (isTimedOut.value) {
    errorMessage.value = `Időkorlátos tiltás alatt vagy! Várj még ${timeoutRemaining.value}.`;
    return;
  }

  if (newMessage.value.trim() !== "") {
   
    const containsForbiddenWord = !isAdmin.value && forbiddenWords.some((word) =>
      newMessage.value.toLowerCase().includes(word)
    );

    if (containsForbiddenWord) {
      errorMessage.value = "Ne írj be csúnya szót!";
    } else {
      socket.emit("chat message", newMessage.value);
      newMessage.value = "";
      errorMessage.value = "";
    }
  }
};

onMounted(() => {

  const storedBan = localStorage.getItem(`user_${userId.value}_banned`);
  const storedTimeout = localStorage.getItem(`user_${userId.value}_timeout`);
  
  if (storedBan === 'true') {
    isBanned.value = true;
  }
  
  if (storedTimeout) {
    timeoutExpires.value = storedTimeout;
    updateTimeoutRemaining();
  }

  socket.emit("login", userId.value);
  
  socket.on("chat message", (msg) => {
    messages.value.push(msg);
  });

  socket.on("message deleted", (messageId) => {
    messages.value = messages.value.filter((msg) => msg.messageId !== messageId);
  });

  socket.on("user banned", (bannedUserId) => {
    if (Number(bannedUserId) === Number(userId.value)) {
      isBanned.value = true;
      localStorage.setItem(`user_${userId.value}_banned`, 'true');
    }
    messages.value = messages.value.filter((msg) => msg.userId !== bannedUserId);
  });

  socket.on("user timeout", ({ userId: timedOutUserId, expires }) => {
    if (Number(timedOutUserId) === Number(userId.value)) {
      timeoutExpires.value = expires;
      localStorage.setItem(`user_${userId.value}_timeout`, expires);
      updateTimeoutRemaining();
    }
  });

  socket.on("user status", (status) => {
    isBanned.value = status.isBanned;
    if (status.isBanned) {
      localStorage.setItem(`user_${userId.value}_banned`, 'true');
    } else {
      localStorage.removeItem(`user_${userId.value}_banned`);
    }
    
    timeoutExpires.value = status.timeoutExpires || null;
    if (timeoutExpires.value) {
      localStorage.setItem(`user_${userId.value}_timeout`, timeoutExpires.value);
      updateTimeoutRemaining();
    } else {
      localStorage.removeItem(`user_${userId.value}_timeout`);
    }
  });

 
  socket.emit("get user status", userId.value);
});

onUpdated(() => {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
});

const deleteMessage = (messageId) => {
  socket.emit("delete message", messageId);
};

const banUser = (userId) => {
  socket.emit("ban user", userId);
};

const timeoutUser = (userId, minutes) => {
  socket.emit("timeout user", userId, minutes);
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">
      Chat
      <button @click="closeChat" class="close-chat-button" title="Chat bezárása">◄</button>
    </div>
    
    <div class="chat-messages" ref="chatMessagesRef">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        class="message"
      >
        <strong class="username">
          {{ message.user }} 
          <span v-if="message.isAdmin" style="color: yellow;">(ADMIN)</span>: 
        </strong>
        <span class="message-text">{{ message.text }}</span>
        
        <div class="admin-buttons" v-if="isAdmin">
          <button class="tiltogombok" @click="deleteMessage(message.messageId)">Törlés</button>
          <button class="tiltogombok" @click="banUser(message.userId)">Kitiltás</button>
          <button class="tiltogombok" @click="timeoutUser(message.userId, 5)">5p Timeout</button>
        </div>
      </div>
    </div>

    <div v-if="isBanned" class="status-message error">
      Ön ki van tiltva! Nem küldhet üzeneteket.
    </div>

    <div v-else-if="isTimedOut" class="status-message warning">
      Időkorlátos tiltás: {{ timeoutRemaining }} múlva chatelhet újra
    </div>

    <div v-else class="chat-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Írj üzenetet..."
      />
      <button type="button" @click="sendMessage" class="send-button">
        Küldés
      </button>
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.close-chat-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  float: right;
}

.close-chat-button:hover {
  color: rgb(187, 185, 185);
}

.send-button {
  padding: 8px 16px;
  background-color: rgb(253, 32, 93);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: rgb(206, 30, 80);
}

.error-message {
  color: rgb(248, 31, 31);
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  padding-bottom: 5px;
}

.chat-container {
  width: 350px;
  height: 90vh;
  background-color: rgba(41, 32, 45, 0.9);
  border-radius: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  color: white;
  padding: 10px;
  position: fixed;
  z-index: 1001;
  margin-top: 30px;
}

.chat-header {
  margin-top: 70px;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.05);
}

.username {
  color: rgb(253, 32, 93);
}

.message-text {
  color: white;
  font-weight: normal;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: rgba(41, 32, 45, 0.9);
  position: sticky;
  bottom: 0;
  z-index: 1002;
}

.chat-input input {
  flex-grow: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.admin-buttons {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.tiltogombok {
  padding: 3px 8px;
  font-size: 14px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tiltogombok:hover {
  background-color: #cc0000;
}

.status-message {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  text-align: center;
}

.status-message.error {
  background-color: #ff4444;
  color: white;
}

.status-message.warning {
  background-color: #ffcc00;
  color: black;
}
</style>