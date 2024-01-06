<script setup>
import { defineProps, defineEmits, ref } from "vue";
const props = defineProps({
  show: { type: Boolean, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

const emit = defineEmits(["close", "confirm"]);

const showModal = props.show;
</script>

<template>
  <q-dialog v-model="showModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ props.title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ props.text }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancelar"
          color="primary"
          v-close-popup
          @click="emit('close')"
        />

        <q-btn
          flat
          label="Confirmar"
          color="primary"
          v-close-popup
          @click="emit('confirm')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
