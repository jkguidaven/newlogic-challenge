<template>
    <table class="table table-striped table-borderless">
        <thead>
            <tr>
                <th scope="col">Details</th>
                <th scope="col" class="text-right">Consent Given</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="consent in consents"
                :key="consent.id"
            >
                <td>
                    <b>{{ consent.name }}</b>
                    <div class="language-container">
                        Language: {{ getLanguageName(consent.language) }}
                    </div>
                </td>
                <td class="text-right">
                    
                    <span v-if="consent.response" class="consent-icon yes"><i class="fa fa-check"></i></span>
                    <span v-else class="consent-icon no"><i class="fa fa-times"></i></span>

                    <button type="button" class="play-button" @click="() => { playAudio(consent.audio); }">
                        <i class="fa fa-play"></i>
                    </button> 
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import { Languages } from '../../languages';

    const methods = {
        getLanguageName: function (code) {
            return Languages[code].label;
        },

        playAudio: function (blob) {
            const audio = new Audio(URL.createObjectURL(blob));
            audio.play();
        }
    };

    export default {
        name: 'ConsentTable',
        methods,
        props: {
            consents: Array
        },
    };
</script>

<style scoped>
    .consent-icon {
        display: inline-block;
        margin: 10px;
    }

    .consent-icon.yes i {
        color: green;
    }

    .consent-icon.no i {
        color: darkslategrey;
    }

  .play-button {
    background-color: lightgrey;
    border: none;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    font-size: 10px;
    border-radius: 50%;
    outline: none;
  }

  .play-button:active { background-color: grey; }
  .play-button:hover { background-color: darkgrey; }
  .play-button:disabled { background-color: lightgrey; }

  .language-container {
      font-size: 12px;
      color: grey;
  }
</style>