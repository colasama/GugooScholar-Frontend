<template>
  <div>
    <a-result :sub-title="title" status="404">
      <template #icon>
        <a-icon type="smile" theme="twoTone" />
      </template>
      <template #extra> </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: 'nothing-found',
  props: {
    title: String
  }
}
</script>