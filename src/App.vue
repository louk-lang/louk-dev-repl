<template>
    <div id="app">
        <div id="editors">
            <codemirror target="_blank" v-model="input" v-bind:options="editOptions"></codemirror>
            <codemirror v-model="output" v-bind:options="previewOptions"></codemirror>
        </div>
        <div id="toolbar">
            <a alt="Louk logo" href="https://github.com/louk-lang/louk-dev-repl">
                <img id="logo" src="logo.png" />
            </a>
            <div>
                <span class="path">{{versionPath}}</span>
                <select id="version-selector" v-model="version">
                    <option>Source</option>
                    <option>Dist</option>
                    <option>Install</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import loukSrc from '../../louk/src/index.ts'
    import loukDist from '../../louk/dist/index.js'
    import loukInstall from 'louk'
    export default {
        name: 'app',
        components: {
            codemirror
        },
        data: function(){
            return {
                input: "abc",
                editOptions: {
                    tabSize: 4,
                    mode: 'text/javascript',
                    theme: 'base16-dark',
                    lineNumbers: true,
                    line: true,
                    indentWithTabs: true,
                },
                previewOptions: {
                    tabSize: 4,
                    mode: 'text/javascript',
                    theme: 'base16-dark',
                    lineNumbers: true,
                    line: true,
                    indentWithTabs: true,
                    readOnly: true,
                },
                version: "Source",
                versionMap: {
                    Source: '../../louk/src/index.ts',
                    Dist: '../../louk/dist/index.js',
                    Install: 'louk'
                }
            }
        },
        computed:{
            outputFromSrc: function(){
                return loukSrc(this.input)
            },
            outputFromDist: function(){
                return loukDist(this.input)
            },
            outputFromInstalled: function(){
                return loukInstall(this.input)
            },
            output: function(){
                if (this.version === "Source"){
                    return this.outputFromSrc;
                }
                else if (this.version === "Dist"){
                    return this.outputFromDist;
                }
                else if (this.version === "Install"){
                    return this.outputFromInstall
                }
                else {
                    return "Invalid source"
                }
            },
            versionPath: function(){
                return this.versionMap[this.version];
            }
        }
    }
</script>

<style>
    html,body{
        margin:0;
        padding:0;
        height:100%;
        font-family: "Consolas";
    }
    #app{
        height:100%;
        display:flex;
        flex-direction: column;
    }
    #editors{
        display:flex;
        height:100%;
    }
    #toolbar{
        padding:10px;
        background-color: #f7f7f7;
        border-top: 1px solid #dddddd;
        height:20px;
        display:flex;
        align-items: stretch;
        align-content: stretch;
        justify-content: space-between;
    }
    #logo{
        height: 20px;
    }
    .vue-codemirror{
        width:50%;
    }
    .CodeMirror{
        height:100%;
    }
    .path{
        font-size: 12px;
        margin:3px 10px 2px 10px;
    }
</style>
