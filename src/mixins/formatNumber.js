const formatNumberMixin = {
    methods: {
        $formatNumberDecimal: function (num) {
            if (!num) return '0.00';
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    }
}

export default formatNumberMixin