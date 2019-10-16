<template>
    <div>
        <p
            v-for="(text, index) in data"
            :key="index"
        >
            {{ text }}
        </p>
    </div>
</template>

<script>
    const methods = {
        /*
            * In chrome, will need to wait first if getVoices() 
            * is now ready and return correct voice list. 
        */
        getVoiceByLanguage: function (language) {
            return new Promise(function (resolve) {
                    let synth = window.speechSynthesis;
                    let intervalInstance;

                    intervalInstance = setInterval(() => {
                        if (synth.getVoices().length !== 0) {
                            let voices = synth.getVoices();
                            let voice = voices[0];

                            for(let i = 0; i < voices.length; i++) {
                                if(voices[i].lang == language) {
                                    voice = voices[i];
                                    break;
                                }
                            }

                            resolve(voice);
                            clearInterval(intervalInstance);
                        }
                    }, 10);
                }
            );
        },
        beginReading: function (voice, readable) {
            let speaker = window.speechSynthesis;
            let utter = new SpeechSynthesisUtterance(readable);
            utter.voice = voice;
            utter.pitch = 1;
            utter.rate = .8; // not so artificial

            utter.addEventListener('end', () => {
                this.$emit("onCompleteRead", null);
            });

            speaker.speak(utter);
        }
    };

    export default {
        name: 'Reader',
        methods,
        props: {
            language: String,
            data: Array
        },
        mounted: function () {
            if(window.speechSynthesis) {
                this.getVoiceByLanguage(this.language).then( (voice) => {
                    this.beginReading(voice, this.data.join(" "));
                });
            } else {
                // We don't support synth.. we should emit complete
                this.$emit("onCompleteRead");
            }
        },
        destroyed: function () {
            if(window.speechSynthesis && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        }
    };
</script>

