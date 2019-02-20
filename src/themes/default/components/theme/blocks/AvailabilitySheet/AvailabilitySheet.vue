<template>
  <div class="availability-sheet">
    <div class="radioStyled">
      <div class="flex w-100">
        <div class="info"><i>i</i></div>
        <div class="content">
          <p class="title">{{ item.city }}, {{ item.streetname }}, {{ item.streetname2 }}</p>
          <div class="subtitle">
            <pre>{{ item.id }}</pre>
            <pre>{{ findMissing() }}</pre>
            <pre v-for="miss in findMissing()" :key="miss.id">{{ miss.sku }} : {{ miss.qty }}</pre>
            <div class="popup" v-if="showPopup">
              <div class="popup-container">
                <product v-for="product in productsInCart" :key="product.sku" :product="product"/>
                <div v-if="productsInCart && productsInCart.length"
                     class="checkout bg-cl-secondary pt10 serif cl-accent">

                  <div v-for="(segment, index) in totals"
                       :key="index"
                       class="row pt15 pb20 pl30 pr55"
                       v-if="segment.code !== 'grand_total'">
                    <div class="col-xs cl-accent">
                      {{ segment.title }}
                    </div>
                    <div v-if="segment.value != null" class="col-xs align-right cl-accent h4">
                      {{ segment.value | price }}
                    </div>
                  </div>

                  <div class="row pt20 pb20 pl30 pr55 weight-400 h3"
                       v-for="(segment, index) in totals"
                       :key="index"
                       v-if="segment.code === 'grand_total'">
                    <div class="col-xs">
                      {{ segment.title }}
                    </div>
                    <div class="col-xs align-right">
                      {{ segment.value | price }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!notAll" class="all">Забрать здесь</div>
            <div v-if="notAll" class="not-all">
              Отсутствует: <a href="#" @click.prevent="showPopup = !showPopup">
                {{ filterData(notAll) && filterData(notAll).name }}
              </a>
            </div>
          </div>
        </div>
        <label class="button-wrapper">
          <a href="#" :class="[{'btn-outline btn-danger btn': !notAll}]">
            {{ !notAll ? 'Забрать здесь' : `Заказать на ${cDate}` }}
            <input type="radio" v-model="selected" :value="item.id" >
          </a>
        </label>
      </div>
    </div>
  </div>
</template>

<script>

import AvailabilitySheet from '../../../../../../../src/modules/availability-sheet/components/AvailabilitySheet'

export default {
  name: 'AvailabilitySheet',
  mixins: [AvailabilitySheet]
}
</script>

<style lang="scss">
  #checkout {
    .availability-sheet {
      position: relative;
      .radioStyled {
        border-bottom: 1px solid #ebebeb;
        padding: 20px 0 10px;
        cursor: inherit;
        .flex {
          position: relative;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap: nowrap;
          -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
          -webkit-justify-content: flex-start;
          -ms-flex-pack: start;
          justify-content: flex-start;
          -webkit-align-content: space-around;
          -ms-flex-line-pack: distribute;
          align-content: space-around;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;
          .info {
            min-width: 20px;
            height: 20px;
            i {
              background: #dd3743;
              color: #ffffff;
              font-size: 14px;
              line-height: 20px;
              text-align: center;
              -webkit-border-radius: 100%;
              -moz-border-radius: 100%;
              border-radius: 100%;
              font-weight: 900;
              font-style: normal;
              display: block;
            }
          }
          .content {
            min-width: 40%;
            padding-left: 10px;
            padding-right: 120px;
            p, a, .subtitle {
              margin: 0;
              font-size: 14px;
              line-height: 18px;
              font-weight: 400;
            }
            .subtitle {
              color: #4bad8d;
              font-size: 12px;
              position: relative;

              .not-all {
                color: #ffad2e;
                position: relative;
                a {
                  font-size: 12px;
                  border-bottom: 1px dotted #ffad2e;

                  &.underline:after, &:not(.no-underline):hover:after {
                    display: none;
                  }
                }
              }
              .popup {
                position: absolute;
                bottom: 20px;
                right: 0;
                left: 45%;
                width: 200%;
                margin: 0 auto;
                background: #ffffff;
                z-index: 1;
                border: 1px solid #dadada;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                padding: 15px;
                &:before {
                  content: '';
                  position: absolute;
                  display: inline-block;
                  width: 0;
                  height: 0;
                  left: 30px;
                  bottom: -5px;
                  border-style: solid;
                  border-color: transparent;
                  border-bottom: 0;
                  border-top-color: #b7b7b7;
                  border-width: 5px;
                  border-right-width: 5px;
                  border-left-width: 5px;
                }
                &:after {
                  content: "";
                  position: absolute;
                  width: 0;
                  height: 0;
                  border-style: solid;
                  border-color: transparent;
                  border-bottom: 0;
                  border-top-color: #ffffff;
                  bottom: -4px;
                  left: 31px;
                  border-width: 4px;
                  border-right-width: 4px;
                  border-left-width: 4px;
                }
                .popup-container {
                  max-height: 250px;
                  overflow-y: auto;
                  & > .row {
                    padding: 15px 15px 0;
                    margin: 0;
                    .mb15 {
                      margin-bottom: 5px;
                    }
                  }
                  img {
                    width: 50px;
                    height: 50px;
                  }
                  .h4 {
                    font-size: 16px;
                    line-height: 18px;
                  }
                  .h5 {
                    font-size: 13px;
                    line-height: 16px;
                  }
                  .options, .checkout {
                    display: none;
                  }
                }
              }
            }
          }
          .button-wrapper {
            position: absolute;
            width: auto;
            text-align: right;
            right: 0;
            top: 0;
            .btn {
              display: inline-block;
              padding: 10px 20px;
              font-size: 14px;
              font-weight: 400;
              background-color: transparent;
              border: 1px solid #dd3743;
              color: #dd3743;
              -webkit-border-radius: 3px;
              -moz-border-radius: 3px;
              border-radius: 3px;
              -webkit-transition: all .3s;
              -moz-transition: all .3s;
              -ms-transition: all .3s;
              -o-transition: all .3s;
              transition: all .3s;
              &:hover {
                background: #dd3743;
                color: #ffffff;
              }
            }
            a {
              font-size: 13px;
              line-height: 16px;
              color: #6a6a6a;
              border-bottom: 1px dotted #6a6a6a;
              display: inline-block;
              -webkit-transition: all .3s;
              -moz-transition: all .3s;
              -ms-transition: all .3s;
              -o-transition: all .3s;
              transition: all .3s;

              &.underline:after, &:not(.no-underline):hover:after {
                display: none;
              }
            }
            input {
              width: 100%;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              height: 100%;
              margin: 0;
              cursor: pointer;
              z-index: 3;
            }
          }
        }
      }
    }
  }
</style>
