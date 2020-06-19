const formatNumberMixin = {
    methods: {
        $formatNumberDecimal: function (num) {
            if (!num) return '';
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    }
}

export default formatNumberMixin