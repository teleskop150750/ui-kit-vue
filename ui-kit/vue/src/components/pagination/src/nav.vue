<script setup lang="ts">
import { useLocale, useNamespace } from '@ui/hooks'
import { computed } from 'vue'

import Button from './button.vue'
import { useNavPagers, usePaginationRoute, useRoute } from './hooks'
import MoreNext from './more-next.vue'
import MorePrev from './more-prev.vue'
import { nPaginationNavEmits, nPaginationNavProps } from './nav.model'
import Next from './next.vue'
import Prev from './prev.vue'

const props = defineProps(nPaginationNavProps)

const emit = defineEmits(nPaginationNavEmits)

const ns = useNamespace('pagination-nav')
const { t } = useLocale()

const { showPrevMore, showNextMore, pagers } = useNavPagers(props)
const { routeNav } = usePaginationRoute(props)

const queryType = computed(() => props.queryType)
const pageNumberOrOffsetQueryParamName = computed(() => props.pageNumberOrOffsetQueryParamName)
const pageSizeQueryParamName = computed(() => props.pageSizeQueryParamName)

const { makeLink } = useRoute(routeNav, {
  queryType,
  pageNumberOrOffsetQueryParamName,
  pageSizeQueryParamName,
})

function handlePrev(val: number) {
  emit('prevClick', val)

  if (routeNav.value === undefined) {
    emit('click', val)
  }
}

function handleNext(val: number) {
  emit('nextClick', val)

  if (routeNav.value === undefined) {
    emit('click', val)
  }
}

function handleChangerCurrentPage(val: number) {
  if (routeNav.value === undefined) {
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
        <Prev
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
        <Button
          :aria-current="currentPage === 1"
          :aria-label="t('nado.pagination.currentPage', { pager: 1 })"
          :disabled="disabled"
          label="1"
          :to="makeLink(1, pageSize)"
          :mode="currentPage === 1 ? 'solid' : 'outline'"
          @click="handleChangerCurrentPage(1)"
        />
      </li>
      <li v-if="showPrevMore" :class="ns.e('item')">
        <MorePrev
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
        <Button
          :disabled="disabled"
          :aria-current="currentPage === pager"
          :aria-label="t('nado.pagination.currentPage', { pager })"
          :label="pager"
          :mode="currentPage === pager ? 'solid' : 'outline'"
          :to="makeLink(pager, pageSize)"
          @click="currentPage !== pager && handleChangerCurrentPage(pager)"
        />
      </li>
      <li v-if="showNextMore" :class="ns.e('item')">
        <MoreNext
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
        <Button
          :disabled="disabled"
          :aria-current="currentPage === pageCount"
          :aria-label="t('nado.pagination.currentPage', { pager: pageCount })"
          :mode="currentPage === pageCount ? 'solid' : 'outline'"
          :label="pageCount"
          :to="makeLink(pageCount, pageSize)"
          @click="handleChangerCurrentPage(pageCount)"
        />
      </li>
      <li :class="ns.e('item')">
        <Next
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
