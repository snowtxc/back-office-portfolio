<script setup>
import { defineProps, defineEmits, ref } from "vue";
import FileStorageService from "src/services/FileStorageService";
import ProjectService from "src/services/ProjectService";

const props = defineProps({
  show: { type: Boolean, required: true },
});

const emit = defineEmits(["onCreate", "close"]);

const form = ref({
  title: "",
  subtitle: "",
  description: "",
  image: null,
  repositorioPrivado: false,
  linkRepo: "",
  tecnologias: [],
  inputTool: "",
});
const creating = ref(false);
const onNewTool = () => {
  const value = form.value.inputTool;
  form.value.tecnologias.push(value);
  form.value.inputTool = "";
};

const onSubmit = async () => {
  let urlImage = "";
  creating.value = true;
  if (form.value.image) {
    const fileName = form.value.image.name;
    const extension = fileName.split(".").pop();
    urlImage = await FileStorageService.uploadFile(form.value.image, extension);
  }
  const newProject = await ProjectService.create({
    ...form.value,
    image: urlImage,
  });
  creating.value = false;
  emit("onCreate", newProject);
};

const showModal = props.show;
</script>
<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">Nuevo proyecto</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="flex column">
          <q-label>Titulo</q-label>
          <q-input dense v-model="form.title" />
        </div>

        <div class="flex column q-mt-md">
          <q-label>Subtitulo</q-label>
          <q-input dense v-model="form.subtitle" />
        </div>

        <div class="flex column q-mt-md">
          <q-label>Descripcion</q-label>
          <q-input dense v-model="form.description" type="textarea" />
        </div>
        <div class="q-mt-md">
          <q-file filled bottom-slots v-model="form.image" label="Subir imagen">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
            <template v-slot:append>
              <q-icon name="close" class="cursor-pointer" />
            </template>
          </q-file>
        </div>

        <div class="row q-col-gutter-md">
          <div class="q-mt-md col-5">
            <q-card class="q-pa-md">
              <div>
                <q-label>Repositorio es privado</q-label>
                <q-toggle v-model="form.repositorioPrivado" color="primary" />
              </div>
              <div v-if="!form.repositorioPrivado">
                <q-label>Link </q-label>
                <q-input
                  dense
                  v-model="form.linkRepo"
                  @keyup.enter="prompt = false"
                />
              </div>
            </q-card>
          </div>

          <q-card class="q-pa-md q-mt-md col-6 offset-1">
            <q-label>Nueva Herramienta</q-label>

            <div class="row flex items-center q-col-gutter-md">
              <div class="col-9">
                <q-input
                  dense
                  @keyup.enter="prompt = false"
                  v-model="form.inputTool"
                />
              </div>
              <div class="col-3 flex items-center">
                <q-btn
                  class="col-3"
                  round
                  color="primary"
                  icon="add"
                  :disable="form.inputTool.trim().length <= 0"
                  @click="onNewTool"
                />
              </div>
            </div>

            <div class="q-mt-md"></div>
            <div class="flex" style="flex-wrap: wrap">
              <q-chip v-for="(tool, idx) in form.tecnologias" :key="idx">{{
                tool
              }}</q-chip>
            </div>
          </q-card>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="emit('close')" />
        <q-btn
          flat
          label="Agregar Proyecto"
          :loading="creating"
          icon-right="add"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
