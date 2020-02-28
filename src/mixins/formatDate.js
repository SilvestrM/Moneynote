import moment from 'moment'

const formatDateMixin = {
    methods: {
        $formatDate: function (date) {
            if (!date) return '';
            return moment(String(date)).format("Do MMM YYYY");
        }
    }
}

export default formatDateMixin