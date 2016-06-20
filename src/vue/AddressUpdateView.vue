<style lang="sass">
.address-update-view {
    min-height: 100%;
    .items {
        >div{
            padding: 0 32px;
            height: 86px;
            line-height: 86px;
            input {
                display: block;
                border: 0;
                height:84px;
                width: 100%;
            }
            &.site {
                height: 160px;
                padding-left: 28px;
                textarea {
                    display: block;
                    padding: 24px 0;
                    height: 158px;
                    line-height: 38px;
                    width: 100%;
                    border: 0;
                }
            }
        }
    }
    .ensure {
        width: 686px;
        height: 80px;
        line-height: 80px;
        border-radius: 8px;
        margin: 50px auto 0;
    }
    ::-webkit-input-placeholder {
        color: #c6c6c6;
        padding-top: 7px;
    }
    ::-webkit-textarea-placeholder {
        color: #c6c6c6;
    }
}
</style>
<template>
<div class="address-update-view bg-default">
    <div class="items bg-white">
        <div class="border-bottom"><input class="font-30" type="text" placeholder="收货人" v-model="receiver"></div>
        <div class="border-bottom"><input class="font-30" type="tel" placeholder="手机号码" v-model="phone" maxlength="11" minlength="11"></div>
        <div class="area border-bottom font-30 flex" @click="selectArea">
            <div class="flex-1">
                <div v-if="!city" class="light">所在地</div>
                <span>{{province}}</span>
                <span v-if="province !== city">{{city}}</span>
            </div>
            <div class="icon-enter light"></div>
        </div>
        <div class="border-bottom site"><textarea class="font-30" placeholder="详细地址" v-model="site"></textarea></div>
    </div>
    <div class="ensure bg-gray white center font-30" :class="{'bg-red': complete}" @click="ensure">确定</div>
</div>
</template>
<script>
export default {
    name: 'AddressUpdateView',
    data() {
        return {
            receiver: '',
            phone: '',
            site: '',
            province: '',
            city: ''
        }
    },
    computed: {
        complete() {
            return this.receiver && this.phone && this.site && this.city;
        },
        isValid() {
            return this.phone.length === 11;
        }
    },
    route: {
        data({to, next}) {
            if(to.params.id === 'none') {   //  新增
                this.receiver = _.get(this, 'self.nickname');
                this.phone = _.get(this, 'self.phone');
                next();
            } else {    //  修改
                return this.$get(`mall/address/${to.params.id}`)
                        .then((data) => {
                            this.receiver = data.receiver_name;
                            this.phone = data.receiver_phone;
                            this.site = data.receiver_address;
                            this.province = data.area.parent.name;
                            this.city = data.area.name;
                            this.areaId = data.area.id;
                        });
            }
        }
    },
    methods: {
        selectArea() {
            this.action('region').then((data) => {
                this.area = JSON.parse(data);
                this.province = this.area.province;
                this.city = this.area.city;
                this.areaId = this.area.id;
            });
        },
        ensure() {
            if(this.complete && this.isValid) {
                const address = this.$route.params.id !== 'none' && this.$route.params.id;
                const product = this.$route.query.product;
                const api = address ? `mall/address/${address}` : 'mall/addresses';
                const req = address ? this.$put : this.$post;
                req(api, {
                    receiver_name: this.receiver,
                    receiver_phone: this.phone,
                    receiver_area_id: this.areaId,
                    receiver_address: this.site
                }).then((data) => {
                    if(product && address) {
                        this.$put(`mall/address/${data.id}`, {
                            is_default: true
                        }).then(() => {
                            this.action('back', {step: 2, refresh: true});
                        });
                    } else {
                        this.action('back', {step: 1, refresh: true});
                    }
                });
            } else if(this.complete && !this.isValid) {
                this.action('toast', {success: 0, text: '请填写正确的手机号'});
            }
        }
    }
}
</script>
