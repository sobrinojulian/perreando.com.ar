import { defineStore } from 'pinia'

export const useZonaStore = defineStore('zona', {
  state: () => ({
    zonas: [],
    zonasDisponibles: [
      'Almagro',
      'Balvanera',
      'Barracas',
      'Belgrano',
      'Boedo',
      'Caballito',
      'Chacarita',
      'Coghlan',
      'Colegiales',
      'Constitución',
      'Flores',
      'Floresta',
      'La Boca',
      'Liniers',
      'Mataderos',
      'Monte Castro',
      'Montserrat',
      'Nueva Pompeya',
      'Nuñez',
      'Palermo',
      'Parque Avellaneda',
      'Parque Chacabuco',
      'Parque Patricios',
      'Puerto Madero',
      'Recoleta',
      'Retiro',
      'Saavedra',
      'San Cristobal',
      'San Nicolás',
      'San Telmo',
      'Velez Sarsfield',
      'Versalles',
      'Villa Crespo',
      'Villa del Parque',
      'Villa Devoto',
      'Villa Lugano',
      'Villa Luro',
      'Villa Ortúzar',
      'Villa Pueyrredón',
      'Villa Real',
      'Villa Riachuelo',
      'Villa Santa Rita',
      'Villa Soldati',
      'Villa Urquiza'
    ]
  }),
  actions: {
    agregarZona(zona) {
      this.zonas.push(zona)
    },
    eliminarZona(index) {
      this.zonas.splice(index, 1)
    },
    getZonasDisponibles() {
      return this.zonasDisponibles
    }
  }
})
