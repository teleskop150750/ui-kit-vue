<script setup lang="ts">
import { useLocale, useNamespace } from '@nado/ui-kit-hooks'
import { computed } from 'vue'

import { useNavPagers, useRoute, useRouteLocation } from './hooks'
import NPaginationNavButton from './NPaginationNavButton.vue'
import NPaginationNavMoreNext from './NPaginationNavMoreNext.vue'
import NPaginationNavMorePrev from './NPaginationNavMorePrev.vue'
import NPaginationNavNext from './NPaginationNavNext.vue'
import NPaginationNavPrev from './NPaginationNavPrev.vue'
import { nPaginationNavEmits, nPaginationNavProps } from './pagination-nav.model'

const props = defineProps(nPaginationNavProps)

const emit = defineEmits(nPaginationNavEmits)

const ns = useNamespace('pagination-nav')
const { t } = useLocale()

const { showPrevMore, showNextMore, pagers } = useNavPagers(props)
const { route } = useRoute(props)

const queryType = computed(() => props.queryType)
const pageNumberOrOffsetQueryParamName = computed(() => props.pageNumberOrOffsetQueryParamName)
const pageSizeQueryParamName = computed(() => props.pageSizeQueryParamName)

const { makeLocation } = useRouteLocation(route, {
  queryType,
  pageNumberOrOffsetQueryParamName,
  pageSizeQueryParamName,
})

function handlePrev(val: number) {
  emit('prevClick', val)

  if (route.value === undefined) {
    emit('click', val)
  }
}

function handleNext(val: number) {
  emit('nextClick', val)

  if (route.value === undefined) {
    emit('click', val)
  }
}

function handleChangerCurrentPage(val: number) {
  if (route.value === undefined) {
    emit('click', val)
  }
}
</script>

<script lang="ts">
export default {
  name: 'NPaginationNav',
}
</script>

<template>
  <nav :class="ns.b()">
    <ul :class="ns.e('list')">
      <li :class="ns.e('item')">
        <NPaginationNavPrev
          :page-number-or-offset-query-param-name="pageNumberOrOffsetQueryParamName"
          :page-size-query-param-name="pageSizeQueryParamName"
          :query-type="queryType"
          :current-page="currentPage"
          :page-count="pageCount"
          :page-size="pageSize"
          :class="ns.e('prev')"
          :disabled="disabled"
          :prev-text="prevText"
          :prev-icon="prevIcon"
          @change="handlePrev"
        />
      </li>
      <li v-if="pageCount > 0" :class="ns.e('item')">
        <NPaginationNavButton
          :aria-current="currentPage === 1"
          :aria-label="t('nado.pagination.currentPage', { pager: 1 })"
          :disabled="disabled"
          label="1"
          :to="makeLocation(1, pageSize)"
          :active="currentPage === 1"
          @click="handleChangerCurrentPage(1)"
        />
      </li>
      <li v-if="showPrevMore" :class="ns.e('item')">
        <NPaginationNavMorePrev
          :page-number-or-offset-query-param-name="pageNumberOrOffsetQueryParamName"
          :page-size-query-param-name="pageSizeQueryParamName"
          :query-type="queryType"
          :current-page="currentPage"
          :page-count="pageCount"
          :page-size="pageSize"
          :disabled="disabled"
          :pager-count="pagerCount"
          @change="handleChangerCurrentPage"
        />
      </li>
      <li v-for="pager in pagers" :key="pager" :class="[ns.e('item')]">
        <NPaginationNavButton
          :disabled="disabled"
          :aria-current="currentPage === pager"
          :aria-label="t('nado.pagination.currentPage', { pager })"
          :label="pager"
          :active="currentPage === pager"
          :to="makeLocation(pager, pageSize)"
          @click="currentPage !== pager && handleChangerCurrentPage(pager)"
        />
      </li>
      <li v-if="showNextMore" :class="ns.e('item')">
        <NPaginationNavMoreNext
          :page-number-or-offset-query-param-name="pageNumberOrOffsetQueryParamName"
          :page-size-query-param-name="pageSizeQueryParamName"
          :query-type="queryType"
          :current-page="currentPage"
          :page-count="pageCount"
          :page-size="pageSize"
          :disabled="disabled"
          :pager-count="pagerCount"
          @change="handleChangerCurrentPage"
        />
      </li>
      <li v-if="pageCount > 1" :class="ns.e('item')">
        <NPaginationNavButton
          :disabled="disabled"
          :aria-current="currentPage === pageCount"
          :aria-label="t('nado.pagination.currentPage', { pager: pageCount })"
          :active="currentPage === pageCount"
          :label="pageCount"
          :to="makeLocation(pageCount, pageSize)"
          @click="handleChangerCurrentPage(pageCount)"
        />
      </li>
      <li :class="ns.e('item')">
        <NPaginationNavNext
          :page-number-or-offset-query-param-name="pageNumberOrOffsetQueryParamName"
          :page-size-query-param-name="pageSizeQueryParamName"
          :query-type="queryType"
          :current-page="currentPage"
          :page-count="pageCount"
          :page-size="pageSize"
          :disabled="disabled"
          :next-text="nextText"
          :next-icon="nextIcon"
          @change="handleNext"
        />
      </li>
    </ul>
  </nav>
</template>
