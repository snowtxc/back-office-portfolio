<script setup>
import { ref, onBeforeMount } from "vue";
import { db } from "src/firebase";
import ProjectService from "src/services/ProjectService";
import NewProjectModal from "src/components/NewProjectModal.vue";
import ConfirmModal from "src/components/ConfirmModal.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const columns = [
  {
    name: "title",
    required: true,
    label: "Titulo",
    align: "left",
    field: "title",
    sortable: true,
  },
  {
    name: "description",
    label: "Descripcion",
    field: "description",
    align: "center",
    format: (value) => {
      return `${value.substring(0, 50)}..`;
    },
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

const showModalNewProject = ref(false);
const projectSelected = ref(null);
const showDeleteModal = ref(false);

const openModalNewProject = () => {
  showModalNewProject.value = true;
};

const rows = ref([]);

const loading = ref(true);

onBeforeMount(() => {
  ProjectService.list().then((projects) => {
    rows.value = projects;
    loading.value = false;
  });
});

const appendProject = (project) => {
  $q.notify({
    message: "Proyecto creado correctamente",
    color: "positive",
  });
  showModalNewProject.value = false;
  rows.value.unshift(project);
};

const openModalDelete = (project) => {
  projectSelected.value = project;
  showDeleteModal.value = true;
};

const onDelete = () => {
  showDeleteModal.value = false;
  if (!projectSelected.value) {
    return;
  }
  const { id } = projectSelected.value;
  loading.value = true;
  ProjectService.delete(id).then(() => {
    loading.value = false;
    const idx = rows.value.findIndex((item) => item.id == id);
    rows.value.splice(idx, 1);
  });
  $q.notify({
    message: "Proyecto eliminado correctamente",
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
        label="Nuevo proyecto"
        @click="openModalNewProject"
      />
    </div>
    <q-table
      title="Proyectos"
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

  <NewProjectModal
    v-if="showModalNewProject"
    :show="showModalNewProject"
    @close="showModalNewProject = false"
    @onCreate="appendProject"
  ></NewProjectModal>

  <ConfirmModal
    v-if="showDeleteModal"
    :show="showDeleteModal"
    text="Seguro deseas eliminar este proyecto?"
    title="Eliminar Proyecto"
    @close="showDeleteModal = false"
    @confirm="onDelete"
  >
  </ConfirmModal>
</template>
