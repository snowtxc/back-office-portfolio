<script setup>
import { ref, onBeforeMount } from "vue";
import { db } from "src/firebase";
import ConfirmModal from "src/components/ConfirmModal.vue";
import { useQuasar } from "quasar";
import SkillsService from "src/services/SkillService";
import NewSkillModal from "src/components/NewSkillModal.vue";

const $q = useQuasar();

const columns = [
  {
    name: "name",
    required: true,
    label: "Titulo",
    align: "left",
    field: "name",
    sortable: true,
  },

  {
    name: "action",
    label: "Accion",
    field: "action",
    align: "center",
    sortable: true,
  },
];

const showModalNewSkill = ref(false);
const skillSelected = ref(null);
const showDeleteModal = ref(false);

const openModalNewSkill = () => {
  showModalNewSkill.value = true;
};

const rows = ref([]);

const loading = ref(true);

onBeforeMount(() => {
  SkillsService.list().then((skills) => {
    rows.value = skills;
    loading.value = false;
  });
});

const appendSkill = (skill) => {
  $q.notify({
    message: "Skill creada correctamente",
    color: "positive",
  });
  showModalNewSkill.value = false;
  rows.value.unshift(skill);
};

const openModalDelete = (skill) => {
  skillSelected.value = skill;
  showDeleteModal.value = true;
};

const onDelete = () => {
  showDeleteModal.value = false;
  if (!skillSelected.value) {
    return;
  }
  const { id } = skillSelected.value;
  loading.value = true;
  SkillsService.delete(id).then(() => {
    loading.value = false;
    const idx = rows.value.findIndex((item) => item.id == id);
    rows.value.splice(idx, 1);
  });
  $q.notify({
    message: "Habilidad eliminada correctamente",
    color: "positive",
  });
};
</script>

<template>
  <div class="q-pa-md">
    <div class="flex justify-end q-my-md">
      <q-btn
        color="secondary"
        icon-right="account_tree"
        label="Nueva Habilidad"
        @click="openModalNewSkill"
      />
    </div>
    <q-table
      title="Habilidad"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn
            round
            color="red-10"
            icon="delete"
            size="10px"
            @click="openModalDelete(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <NewSkillModal
    v-if="showModalNewSkill"
    :show="showModalNewSkill"
    @close="showModalNewSkill = false"
    @onCreate="appendSkill"
  ></NewSkillModal>

  <ConfirmModal
    v-if="showDeleteModal"
    :show="showDeleteModal"
    text="Seguro deseas eliminar esta habilidad?"
    title="Eliminar Habilidad"
    @close="showDeleteModal = false"
    @confirm="onDelete"
  >
  </ConfirmModal>
</template>
