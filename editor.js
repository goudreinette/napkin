Vue.component('Editor', {
    template: '<div :id="editorId" class="editor" style="width: 100%; height: 100%;"></div>',
    props: ['editorId', 'content', 'lang', 'theme'],
    data () {
        return {
            editor: Object,
            beforeContent: ''
        }
    },
    watch: {
        'content' (value) {
            if (this.beforeContent !== value) {
                this.editor.setValue(value, 1)
            }
        }
    },
    mounted () {
        const lang = this.lang || 'text'
        const theme = this.theme || 'textmate'

        this.editor = window.ace.edit(this.editorId)
        this.editor.setValue(this.content, 1)

        // mode-xxx.js or theme-xxx.jsがある場合のみ有効
        this.editor.getSession().setMode(`ace/mode/javascript`)
        this.editor.setTheme(`ace/theme/${theme}`)


        this.editor.on('change', () => {
            this.beforeContent = this.editor.getValue()
            this.$emit('change-content', this.editor.getValue())
        })
    }
})