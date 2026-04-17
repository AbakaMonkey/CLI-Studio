const CMD_PROMPT = document.getElementById("command");
const output_div = document.getElementById("output");
const synth = new Tone.Synth().toDestination();
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let notes = []
let tempo = 120

const ALLOWED_NOTES = ['Cb3', 'C3', 'C#3', 'Db3', 'D3', 'D#3', 'Eb3', 'E3', 'E#3', 'Fb3', 'F3', 'F#3', "Gb3", 'G3', 'G#3', 'Ab3', 'A3', 'A#3', 'Bb3', 'B3', 'B#3', 'Cb4', 'C4', 'C#4', 'Db4', 'D4', 'D#4', 'Eb4', 'E4', 'E#4', 'Fb4', 'F4', 'F#4', "Gb4", 'G4', 'G#4', 'Ab4', 'A4', 'A#4', 'Bb4', 'B4', 'B#4'];

const HOT_CROSS_BUNS = ['D4 2', 'C4 2', 'Bb3 1', 'D4 2', 'C4 2', 'Bb3 1', 'Bb3 4', 'Bb3 4', 'Bb3 4', 'Bb3 4', 'C4 4', 'C4 4', 'C4 4', 'C4 4', 'D4 2', 'C4 2', 'Bb3 1']
const MARY_LITTLE_LAMB = ['D4 4', 'C4 4', 'Bb3 4', 'C4 4', 'D4 4', 'D4 4', 'D4 2', 'C4 4', 'C4 4', 'C4 2', 'D4 4', 'F4 4', 'F4 2', 'D4 4', 'C4 4', 'Bb3 4', 'C4 4', 'D4 4', 'D4 4', 'D4 4', 'D4 4', 'C4 4', 'C4 4', 'D4 4', 'C4 4', 'Bb3 1']
const FLY_ME_TO_MOON = ['C4 4','B3 4','A3 4','G3 8','F3 2','G3 8','A3 4','C4 4','A3 16','A#3 16','B3 4','A3 4','G3 4','F3 8','E3 8','E3 1','A3 4','G3 4','F3 4','E3 8','D3 2','E3 8','F3 4','A3 8','G#3 3','F3 4','E3 4','D3 8','C3 1']
const MD_THEME = ['D4 8','A4 8','E4 8','F4 8','D4 8','A4 8','E4 8','F4 8','C#4 8','A4 8','E4 8','F4 8','Bb4 8','A4 8','G4 8','F4 8','D4 8','A4 8','E4 8','F4 8','D4 8','A4 8','E4 8','F4 8','C#4 8','A4 8','E4 8','F4 8','Bb4 8','A4 8','G4 8','F4 8']
const INTERSTELLAR_BUT_BAD = ['A3 4','E4 2','A3 4','E4 2','Bb3 4','E4 2','Bb3 4','E4 2','C4 4','E4 2','C4 4','E4 2','D4 4','E4 2','D4 4','E4 4','Bb3 4']

function newOutput(fstring) {
  const NEW_OUTPUT = document.createElement('p');
  NEW_OUTPUT.innerHTML = `${fstring}`;
  output_div.prepend(NEW_OUTPUT);
}

async function playNotes(debug) {
  await Tone.start();
  
  if (debug !== "--no-send-output") {
    newOutput(`================ Now playing! ================`)
  }
  
  for (note of notes) {
    let noteDecode = note.split(" ");
    let noteValue = noteDecode[0];
    let noteDuration = noteDecode[1] + "n";
    
    synth.triggerAttackRelease(noteValue, noteDuration);
    if (debug !== "--no-send-output") {
      newOutput(`Current note: ${noteValue}`);
    }
    await sleep(1500 / noteDecode[1]);
  }
  
  if (debug !== "--no-send-output") {
    newOutput(`================ Finished! ================`);
  }
}

CMD_PROMPT.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    let commandRaw = CMD_PROMPT.value.split(" ");
    
    let command = commandRaw[0]
    let arg1 = commandRaw[1]
    let arg2 = commandRaw[2]
    
    CMD_PROMPT.value = '';
    
    //const NEW_OUTPUT = document.createElement('p');
    //NEW_OUTPUT.innerHTML = command
    //output_div.append(NEW_OUTPUT);
    
    if (command === "clear") {
      output_div.replaceChildren();
    } else if (command === "mknt") {
      if (arg1 !== undefined & arg2 !== undefined) {
        if (ALLOWED_NOTES.includes(arg1)) {
          notes.push(`${arg1} ${arg2}`);
          newOutput(`Made ${arg1} with length ${arg2}`);
        } else {
          newOutput(`Unknown value ${arg1} in command \"${command}\"`);
        }
      } else {
        newOutput(`Not enough arguments in command \"${command}\"`)
      }
    } else if (command === "notes") {
      newOutput(`${notes}`);
    } else if (command === "export") {
      playNotes(arg1);
    } else if (command === "delall") {
      newOutput(`Deleting all ${notes.length} notes`);
      notes = [];
    } else if (command === "demo") {
      if (arg1 === "HOT_CROSS_BUNS") {
        notes = HOT_CROSS_BUNS;
        if (arg2 === "-now") {
          playNotes();
        } else {
          newOutput(`Demo ready! Run "export" to play`);
        }
      } else if (arg1 === "MARY_LITTLE_LAMB") {
        notes = MARY_LITTLE_LAMB;
        if (arg2 === "-now") {
          playNotes();
        } else {
          newOutput(`Demo ready! Run "export" to play`);
        }
      } else if (arg1 === "FLY_ME_TO_MOON") {
        notes = FLY_ME_TO_MOON;
        if (arg2 === "-now") {
          playNotes();
        } else {
          newOutput(`Demo ready! Run "export" to play`);
        }
      } else if (arg1 === `MD_THEME`) {
        notes = MD_THEME;
        if (arg2 === "-now") {
          playNotes();
        } else {
          newOutput(`Demo ready! Run "export" to play`);
        }
      } else if (arg1 === `INTERSTELLAR_BUT_BAD`) {
        notes = INTERSTELLAR_BUT_BAD;
        if (arg2 === "-now") {
          playNotes();
        } else {
          newOutput(`Demo ready! Run "export" to play`);
        }
      } else {
        newOutput(`Invalid demo track: ${arg1}`);
      }
    } else if (command === 'changetempo') {
      newOutput(`No :3`);
    } else if (command === 'avaliabletracks') {
      newOutput(`Run "demo" followed by a song to load that track`);
      newOutput(`HOT_CROSS_BUNS`);
      newOutput(`MARY_LITTLE_LAMB`);
      newOutput(`FLY_ME_TO_MOON`);
      newOutput(`MD_THEME`);
      newOutput(`INTERSTELLAR_BUT_BAD`);
    } else {
      newOutput(`Unknown command: \"${command}\"`)
    }
  }
});
