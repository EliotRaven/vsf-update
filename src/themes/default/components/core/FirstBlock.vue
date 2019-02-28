<template>
  <div class="first-block container center-xs start-md">
    <div class="row middle-xs center-sm center-xs">
      <div class="double-search col-xs-10 col-sm-8 col-md-6 start-md center-xs">
        <span>{{ $t('KLIKIS - Wise decisions') }}</span>
        <h2>{{ $t('The largest online order service in Ukraine') }}</h2>
        <p class="start-xs">{{ $t('At your service there are more than 19,000 pharmacies throughout Ukraine. Get orders within an hour.') }}</p>
        <div class="SearchInBlock">
          <SearchInBlock/>
        </div>
        <div class="hidden-xs hidden-sm">
          <div class="search-now">
            <span>{{ $t('Now looking for') + ':' }}</span>
            <ul>
              <li><a href="#">Спазмалгон</a></li>
              <li><a href="#">Терафлю</a></li>
              <li><a href="#">Німесил</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="first-block__img col-xs-6 hidden-xs hidden-sm hidden-md">
        <img src="/assets/first-screen.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import SearchInBlock from 'theme/components/core/blocks/SearchPanel/SearchInBlock'
export default {
  name: 'FirstBlock',
  components: {
    SearchInBlock
  }
}
</script>

<style lang="scss" scoped>
.first-block {
  display: flex;
  align-items: center;
  .double-search {
    flex: 1 0 500px;
    padding: 50px 0;
    span {
      color: #e41c3f;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 14px;
    }
    h2 {
      margin: 15px 0;
      font-size: 42px;
      line-height: 1.5;
    }
    p {
      max-width: 480px;
      font-size: 16px;
      color: #565a66;
      line-height: 1.5;
    }
    .SearchInBlock {
      padding: 20px 0;
    }
    .search-now {
      display: flex;
      font-size: 13px;
      span {
        color: #19233c;
        text-transform: none;
      }
      ul {
        margin: 0;
        padding-left: 15px;
        li {
          display: inline-flex;
          padding-left: 10px;
          color: #d83b4b;
          a {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .first-block__img {
    flex: 1 2 500px;
  }
}
@media (max-width: 767px) {
  .first-block {
    .double-search {
      h2 {
        font-size: 34px;
      }
    }
  }
}
</style>
