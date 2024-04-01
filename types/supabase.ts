export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          base_price_per_night: number
          base_total_price: number
          cabin: Json
          cabin_id: number
          created_at: string
          discount: boolean
          end_date: string
          final_price_per_night: number
          final_total_price: number
          guests: number
          id: number
          nights_breakdown: Json[]
          start_date: string
          status: Database['public']['Enums']['booking_status']
          total_nights: number
          user_id: string
        }
        Insert: {
          base_price_per_night: number
          base_total_price: number
          cabin: Json
          cabin_id: number
          created_at?: string
          discount: boolean
          end_date: string
          final_price_per_night: number
          final_total_price: number
          guests: number
          id?: number
          nights_breakdown: Json[]
          start_date: string
          status?: Database['public']['Enums']['booking_status']
          total_nights: number
          user_id: string
        }
        Update: {
          base_price_per_night?: number
          base_total_price?: number
          cabin?: Json
          cabin_id?: number
          created_at?: string
          discount?: boolean
          end_date?: string
          final_price_per_night?: number
          final_total_price?: number
          guests?: number
          id?: number
          nights_breakdown?: Json[]
          start_date?: string
          status?: Database['public']['Enums']['booking_status']
          total_nights?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'public_bookings_cabin_id_fkey'
            columns: ['cabin_id']
            isOneToOne: false
            referencedRelation: 'cabins'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_bookings_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      cabins: {
        Row: {
          base_price_per_night: number
          capacity: number
          enabled: boolean
          id: number
          name: string
        }
        Insert: {
          base_price_per_night: number
          capacity: number
          enabled?: boolean
          id?: number
          name: string
        }
        Update: {
          base_price_per_night?: number
          capacity?: number
          enabled?: boolean
          id?: number
          name?: string
        }
        Relationships: []
      }
      pricing_adjustments: {
        Row: {
          enabled: boolean
          end_date: string
          id: number
          name: string
          price_multiplier: number
          start_date: string
        }
        Insert: {
          enabled?: boolean
          end_date: string
          id?: number
          name: string
          price_multiplier: number
          start_date: string
        }
        Update: {
          enabled?: boolean
          end_date?: string
          id?: number
          name?: string
          price_multiplier?: number
          start_date?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'public_profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      book_stay: {
        Args: {
          cabin_id: number
          start_date: string
          end_date: string
          guests: number
        }
        Returns: {
          base_price_per_night: number
          base_total_price: number
          cabin: Json
          cabin_id: number
          created_at: string
          discount: boolean
          end_date: string
          final_price_per_night: number
          final_total_price: number
          guests: number
          id: number
          nights_breakdown: Json[]
          start_date: string
          status: Database['public']['Enums']['booking_status']
          total_nights: number
          user_id: string
        }
      }
      search_stay: {
        Args: {
          start_date: string
          end_date: string
          guests: number
        }
        Returns: {
          cabin: Json
          price_details: Json
          stay_start_date: string
          stay_end_date: string
          stay_guests: number
        }[]
      }
    }
    Enums: {
      booking_status: 'pending' | 'confirmed' | 'cancelled'
    }
    CompositeTypes: {
      cabin_details: {
        id: number | null
        name: string | null
        capacity: number | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
