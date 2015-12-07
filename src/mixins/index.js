export default {
    created() {
            const result = this.init();
            if (typeof result === 'object' && result.then) {
                result.then(() => {
                    this.$el.classList.remove('loading');
                });
            }
        },
        methods: {
            init() {
                // console.warn('init not implemented!');
            },
            toast(msg, delay = 2000) {
                const span = document.createElement('span');
                span.innerText = msg;
                span.className = 'toast visible';
                document.body.appendChild(span);
                setTimeout(() => span.parentNode.removeChild(span), delay);
            }
        }
}
