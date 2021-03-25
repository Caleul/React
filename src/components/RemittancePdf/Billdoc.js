import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from '@david.kucsai/react-pdf-table';

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingHorizontal: 35,
  },
  info: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  clientInfo: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Times-Roman',
  },
  textHeader: {
    fontSize: 10,
    alignItems: 'center',
    fontFamily: 'Times-Roman',
  },
  textContent: {
    fontSize: 9,
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  discount: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Times-Roman',
    paddingTop: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },
  table: {
    padding: 10,
  },
  signatures: {
    paddingTop: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signaturesBlocks: {
    width: 150,
    height: 1,
    backgroundColor: '#000',
  },
  finalLine: {
    marginTop: 30,
    alignItems: 'center',
    height: 1,
    backgroundColor: '#000',
  },
});

// Create Document Component
const BillDoc = ({
  info: {
    orders,
    company,
    client,
    discount,
    date,
    remittanceNumber,
    totalPrice,
  },
}) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.body} wrap={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.textContent}>Factura: {remittanceNumber}</Text>
          </View>
          <View style={styles.info}>
            <View>
              <Text>{company.name}</Text>
              <Text>{company.address}</Text>
              <Text>
                {company.state}, {company.country}
              </Text>
              <Text>{date}</Text>
            </View>
            <View style={styles.clientInfo}>
              <Text>{client.name}</Text>
              <Text>{client.addresses[0].address}</Text>
              <Text>
                {client.addresses[0].state}, {client.addresses[0].country}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <Table data={orders}>
              <TableHeader>
                <TableCell style={styles.textHeader}>ORDEN</TableCell>
                <TableCell style={styles.textHeader}>CALIBRADO</TableCell>
                <TableCell style={styles.textHeader}>MATERIAL</TableCell>
                <TableCell style={styles.textHeader}>OD</TableCell>
                <TableCell style={styles.textHeader}>OI</TableCell>
                <TableCell style={styles.textHeader}>PRICE</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.ORDEN}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.CALIBRADO}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.MATERIAL}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OD}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OI}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.PRICE}
                />
              </TableBody>
            </Table>
            {Number(discount) !== 0 && (
              <View>
                <Text style={styles.discount}>Descuento: -{discount} </Text>
              </View>
            )}
            <View>
              <Text style={styles.totalPrice}>TOTAL: {totalPrice} </Text>
            </View>
          </View>
          <View style={styles.signatures}>
            <View style={styles.signaturesBlocks} />
            <View style={styles.signaturesBlocks} />
          </View>
          <View style={styles.finalLine} />
        </View>
        <View style={styles.body} wrap={false}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.textContent}>Factura: {remittanceNumber}</Text>
          </View>
          <View style={styles.info}>
            <View>
              <Text>{company.name}</Text>
              <Text>{company.address}</Text>
              <Text>
                {company.state}, {company.country}
              </Text>
              <Text>{date}</Text>
            </View>
            <View style={styles.clientInfo}>
              <Text>{client.name}</Text>
              <Text>{client.addresses[0].address}</Text>
              <Text>
                {client.addresses[0].state}, {client.addresses[0].country}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <Table data={orders}>
              <TableHeader>
                <TableCell style={styles.textHeader}>ORDEN</TableCell>
                <TableCell style={styles.textHeader}>CALIBRADO</TableCell>
                <TableCell style={styles.textHeader}>MATERIAL</TableCell>
                <TableCell style={styles.textHeader}>OD</TableCell>
                <TableCell style={styles.textHeader}>OI</TableCell>
                <TableCell style={styles.textHeader}>PRICE</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.ORDEN}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.CALIBRADO}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.MATERIAL}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OD}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.OI}
                />
                <DataTableCell
                  style={styles.textContent}
                  getContent={r => r.PRICE}
                />
              </TableBody>
            </Table>
            {Number(discount) !== 0 && (
              <View>
                <Text style={styles.discount}>Descuento: -{discount} </Text>
              </View>
            )}
            <View>
              <Text style={styles.totalPrice}>TOTAL: {totalPrice} </Text>
            </View>
          </View>
          <View style={styles.signatures}>
            <View style={styles.signaturesBlocks} />
            <View style={styles.signaturesBlocks} />
          </View>
          <View style={styles.finalLine} />
        </View>
      </Page>
    </Document>
  );
};

export default BillDoc;
