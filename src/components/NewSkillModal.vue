<script setup>
import { defineProps, defineEmits, ref } from "vue";
import SkillsService from "src/services/SkillService";

const props = defineProps({
  show: { type: Boolean, required: true },
});

const emit = defineEmits(["onCreate", "close"]);

const form = ref({
  name: "",
});

const creating = ref(false);

const onSubmit = async () => {
  creating.value = true;
  const newSkill = await SkillsService.create(form.value);
  creating.value = false;
  emit("onCreate", newSkill);
};

const showModal = props.show;
</script>
<template>
  <q-dialog v-model="showModal" persistent>
    <q-card style="min-width: 600px">
      <q-card-section>
        <div class="text-h6">Nueva Habilidad</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="flex column">
          <q-label>Nombre</q-label>
          <q-input dense v-model="form.name" />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" @click="emit('close')" />
        <q-btn
          flat
          label="Agregar Habilidad"
          :loading="creating"
          icon-right="add"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
