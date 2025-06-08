
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface PoliceStation {
  id: string;
  name: string;
  address: string;
  county: string;
  sub_county?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}

export const usePoliceStations = () => {
  const [stations, setStations] = useState<PoliceStation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('police_stations')
        .select('*')
        .order('name');

      if (error) throw error;
      setStations(data || []);
      return { success: true, data };
    } catch (error: any) {
      console.error('Error fetching police stations:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const findNearestStation = (latitude: number, longitude: number) => {
    if (stations.length === 0) return null;

    // Simple distance calculation (you might want to use a more sophisticated algorithm)
    let nearestStation = stations[0];
    let minDistance = Number.MAX_VALUE;

    stations.forEach(station => {
      if (station.latitude && station.longitude) {
        const distance = Math.sqrt(
          Math.pow(latitude - station.latitude, 2) + 
          Math.pow(longitude - station.longitude, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestStation = station;
        }
      }
    });

    return nearestStation;
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return {
    stations,
    loading,
    fetchStations,
    findNearestStation
  };
};
