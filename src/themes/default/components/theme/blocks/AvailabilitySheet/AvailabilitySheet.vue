<template>
  <div class="availability-sheet">
    <div v-if="showPopup" class="popup-wrapper" @click="mHidePopup" />
    <div class="radioStyled">
      <div class="flex w-100">
        <div class="info"><i>i</i></div>
        <div class="content">
          <p class="title">{{ item.city }}, {{ item.streetname }}, {{ item.streetname2 }}</p>
          <div class="subtitle">
            <div class="popup" v-if="showPopup">
              <div class="popup-container">
                <product v-for="product in productsInCart" :missing-or-low="filterData(product)" :key="product.sku" :product="product"/>
              </div>
            </div>
            <div v-if="!findMissing().length" class="all">Забрать здесь</div>
            <div v-if="findMissing().length" class="not-all">
              Отсутствует: <a href="#" @click.prevent="mShowPopup">
                {{ findMissing().length && findMissing()[0].name }}
              </a>
            </div>
          </div>
        </div>
        <label class="button-wrapper">
          <a href="#" :class="[{'btn-outline btn-danger btn': !findMissing().length}, {'check': checked === item.id}]">
            {{ !findMissing().length ? 'Забрать здесь' : `Заказать на ${cDate}` }}
            <input type="radio" :id="item.id" v-model="selected" :value="item.id" >
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
      .popup-wrapper {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
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
              &.check {
                color: #dd3743;
                border-bottom-color: #dd3743;
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
