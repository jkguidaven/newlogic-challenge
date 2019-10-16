<template>
  <Content title="All Consents">
      <ConsentTable :consents="consents" />
  </Content>
</template>

<script>
  import { ConsentsRepository } from '../../repository';
  import Content from '../common/Content';
  import ConsentTable from '../common/Table';
  
  const components = {
    Content,
    ConsentTable
  }

  export default {
    name: 'List',
    components,
    data: function () {
      return {
        consents: []
      };
    },
    mounted: function () {
      ConsentsRepository.load((result) => {
        this.consents = result;
      }, true);
    }
  }
</script>

